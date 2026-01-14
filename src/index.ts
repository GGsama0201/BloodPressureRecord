export default {
  async fetch(request: Request, env: any, ctx: any) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;

      // Serve index.html for root path
      if (pathname === '/' || pathname === '') {
        const htmlResponse = await fetch(new URL('./index.html', import.meta.url));
        if (htmlResponse.ok) {
          return new Response(htmlResponse.body, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }
        return new Response('index.html not found', { status: 404 });
      }

      // Try to serve static files from the build directory
      try {
        const fileResponse = await fetch(new URL(`.${pathname}`, import.meta.url));
        if (fileResponse.ok) {
          return fileResponse;
        }
      } catch (e) {
        // File not found
      }

      // Return 404 for other requests
      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error('Error:', error);
      return new Response('Server Error: ' + (error instanceof Error ? error.message : String(error)), { status: 500 });
    }
  }
};
