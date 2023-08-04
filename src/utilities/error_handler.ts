type ErrorInfo = {
  message: string;
  name: string;
  stack: string | undefined;
  date: string;
  application: string;
  network_error?: boolean;
};

const error_handler = (api_url: string, application: string) => {
  const load_and_send_stored_errors = async () => {
    const stored_errors = localStorage.getItem('error_logs');

    if (stored_errors) {
      const parsed_errors: ErrorInfo[] = JSON.parse(stored_errors);
      for (const error of parsed_errors) {
        try {
          await send_error_to_api(error);
          // remove the error from the array once it has been successfully sent
          const index = parsed_errors.indexOf(error);
          parsed_errors.splice(index, 1);
          localStorage.setItem('error_logs', JSON.stringify(parsed_errors));
        } catch (e) {
          // if an error occurs while sending, keep the error in local storage and break the loop
          break;
        }
      }
    }
  };

  const set_global_handlers = () => {
    window.onerror = (msg, url, line, col, error) => {
      handle_error(error as Error);
      return false; // prevents default handler
    };

    window.onunhandledrejection = (event: PromiseRejectionEvent) => {
      handle_error(event.reason);
    };
  };

  const handle_error = (error: any) => {
    const default_error_info: any = {
      message: error.message || '',
      name: error.name || '',
      stack: error.stack || '',
      date: new Date().toISOString(),
      application: application,
      fileName: error.fileName || '',
      lineNumber: error.lineNumber || '',
      columnNumber: error.columnNumber || '',
      config: error.config || '',
    };

    const response_info = {
      status: error.status || '',
      statusText: error.statusText || '',
      headers: error.headers || '',
      url: error.url || '',
      redirected: error.redirected || '',
      ok: error.ok || '',
      type: error.type || '',
      bodyUsed: error.bodyUsed || '',
      data: error.response?.data || '',
    };

    const user = localStorage.getItem('user');
    const error_info = {
      ...default_error_info,
      user: user ? JSON.parse(user) : null,
      response: response_info,
    };

    // Check for network error
    if (error.name === 'TypeError') {
      error_info.message = 'Network error';
      error_info.network_error = true;
    }

    send_error_to_api(error_info).catch(() => store_error(error_info));
  };

  const send_error_to_api = async (error_info: ErrorInfo) => {
    const response = await fetch(api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(error_info),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  };

  const store_error = (error_info: ErrorInfo) => {
    let stored_errors = localStorage.getItem('error_logs');
    let parsed_errors: ErrorInfo[] = stored_errors ? JSON.parse(stored_errors) : [];

    parsed_errors.push(error_info);
    localStorage.setItem('error_logs', JSON.stringify(parsed_errors));
  };

  // Initialize error handler
  load_and_send_stored_errors();
  set_global_handlers();
};
export default error_handler;

if (typeof window.components === 'undefined') {
  window.components = {};
}
window.components.error_handler = error_handler;
