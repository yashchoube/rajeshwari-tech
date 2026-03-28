-- Initialize local development database with same schema as production

-- Create tables matching your Neon production database
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  course_id VARCHAR(255) NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  experience VARCHAR(255) NOT NULL,
  goals TEXT,
  referral TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS demo_bookings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  course VARCHAR(255) NOT NULL,
  experience VARCHAR(255) NOT NULL,
  preferred_time VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  author VARCHAR(255),
  featured_image VARCHAR(255),
  category VARCHAR(255),
  tags TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  interests TEXT,
  status VARCHAR(50) DEFAULT 'subscribed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_sent TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  visits INTEGER DEFAULT 0,
  unique_referrers INTEGER DEFAULT 0,
  last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS referrer_data (
  id SERIAL PRIMARY KEY,
  referrer VARCHAR(255) NOT NULL,
  page VARCHAR(255) NOT NULL,
  visits INTEGER DEFAULT 0,
  last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data for development
INSERT INTO enrollments (name, email, phone, course_id, course_name, experience, goals, referral) VALUES
('John Doe', 'john@example.com', '+1234567890', 'core-java-advanced', 'Core Java with Advanced Concepts', 'Beginner', 'Learn Java programming', 'Google Search'),
('Jane Smith', 'jane@example.com', '+1234567891', 'react-basics', 'React Basics', 'Intermediate', 'Build web applications', 'Friend referral');

INSERT INTO demo_bookings (name, email, phone, course, experience, preferred_time, message) VALUES
('Alice Johnson', 'alice@example.com', '+1234567892', 'Python Full Stack', 'Beginner', 'Morning', 'Interested in learning Python'),
('Bob Wilson', 'bob@example.com', '+1234567893', 'Data Structures & Algorithms', 'Intermediate', 'Evening', 'Want to prepare for interviews');

INSERT INTO newsletter_subscriptions (email, name, interests) VALUES
('subscriber1@example.com', 'Subscriber One', '["Programming", "Web Development"]'),
('subscriber2@example.com', 'Subscriber Two', '["Data Science", "Machine Learning"]');

INSERT INTO blogs (title, slug, excerpt, content, author, category, tags, status) VALUES
('Getting Started with Java Programming', 'getting-started-java', 'Learn the basics of Java programming', 'Java is a powerful programming language...', 'RajeshwariTech', 'Programming', 'java,programming,basics', 'published'),
('Introduction to React Development', 'introduction-react', 'Master React for modern web development', 'React is a popular JavaScript library...', 'RajeshwariTech', 'Web Development', 'react,javascript,frontend', 'published');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_enrollments_email ON enrollments(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON enrollments(created_at);
CREATE INDEX IF NOT EXISTS idx_demo_bookings_email ON demo_bookings(email);
CREATE INDEX IF NOT EXISTS idx_demo_bookings_created_at ON demo_bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dev_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dev_user;
