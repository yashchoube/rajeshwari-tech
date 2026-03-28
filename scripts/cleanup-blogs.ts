import Database from 'better-sqlite3';
import { sanitizeHtml } from './src/lib/htmlUtils';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data/rajeshwari-tech.db');
const db = new Database(dbPath);

async function cleanup() {
  console.log('--- Starting Blog Content Cleanup ---');
  
  const blogs = db.prepare('SELECT id, title, content FROM blogs').all() as any[];
  console.log(`Found ${blogs.length} blogs to check.`);

  let updatedCount = 0;

  for (const blog of blogs) {
    const originalContent = blog.content;
    const cleanContent = sanitizeHtml(originalContent);

    if (originalContent !== cleanContent) {
      console.log(`Cleaning blog [${blog.id}]: ${blog.title}`);
      db.prepare('UPDATE blogs SET content = ? WHERE id = ?').run(cleanContent, blog.id);
      updatedCount++;
    }
  }

  console.log(`--- Cleanup Finished: ${updatedCount} blogs updated ---`);
}

cleanup().catch(console.error);
