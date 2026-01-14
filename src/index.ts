import { readFileSync } from 'fs';
import { join } from 'path';

export default {
  async fetch(request: Request, env: any, ctx: any) {
    try {
      const url = new URL(request.url);
      
      // Serve index.html for root path
      if (url.pathname === '/' || url.pathname === '') {
        const html = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');
        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }
      
      // For other requests, return 404
      return new Response('Not Found', { status: 404 });
    } catch (error) {
      return new Response('Server Error', { status: 500 });
    }
  }
};
