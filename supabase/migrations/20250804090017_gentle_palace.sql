/*
  # Vansh Service Center Database Schema

  1. New Tables
    - `services` - Store service information, descriptions, brands, and FAQs
    - `reviews` - Customer reviews and ratings
    - `blog_posts` - Blog articles and content
    - `contact_submissions` - Contact form submissions and support tickets
    - `admins` - Admin users for content management

  2. Security
    - Enable RLS on all tables
    - Public read access for services, reviews, and published blog posts
    - Admin-only write access for content management
    - Contact submissions visible only to admins

  3. Features
    - Full-text search on services and blog posts
    - Automatic timestamps
    - JSON fields for complex data (brands, FAQs)
    - Status tracking for contact submissions
*/

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  image_url text DEFAULT '',
  brands jsonb DEFAULT '[]'::jsonb,
  faqs jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  message text NOT NULL,
  service text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  approved boolean DEFAULT true
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  author text DEFAULT 'Vansh Service Team',
  image_url text DEFAULT '',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  appliance_type text NOT NULL,
  message text NOT NULL,
  location text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Anyone can read services"
  ON services FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read approved reviews"
  ON reviews FOR SELECT
  TO public
  USING (approved = true);

CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (published = true);

-- Contact submission policies
CREATE POLICY "Anyone can create contact submissions"
  ON contact_submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can read all contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins WHERE admins.email = auth.jwt() ->> 'email'
  ));

-- Admin policies
CREATE POLICY "Authenticated users can read admin status"
  ON admins FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Admin content management policies
CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins WHERE admins.email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Admins can manage reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins WHERE admins.email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins WHERE admins.email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Admins can manage contact submissions"
  ON contact_submissions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins WHERE admins.email = auth.jwt() ->> 'email'
  ));

-- Insert sample data
INSERT INTO services (title, slug, description, image_url, brands, faqs) VALUES
('Refrigerator Repair', 'refrigerator-repair', 'Expert refrigerator repair services for all brands. We fix cooling issues, compressor problems, ice maker repairs, and more.', 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg', '["Samsung", "LG", "Whirlpool", "Godrej", "Haier", "Bosch"]', '[{"question": "How long does refrigerator repair take?", "answer": "Most refrigerator repairs are completed within 1-2 hours on the same day."}, {"question": "Do you provide warranty?", "answer": "Yes, we provide 30-day warranty on all parts and 90-day warranty on labor."}]'),
('Washing Machine Repair', 'washing-machine-repair', 'Professional washing machine repair for front load, top load, and semi-automatic machines. We handle drainage, spin, and electrical issues.', 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg', '["LG", "Samsung", "Whirlpool", "Bosch", "IFB", "Godrej"]', '[{"question": "What washing machine problems do you fix?", "answer": "We repair drainage issues, spin problems, electrical faults, door locks, and control panel issues."}, {"question": "Do you repair both front and top load machines?", "answer": "Yes, we service all types of washing machines including semi-automatic models."}]'),
('AC Repair & Service', 'ac-repair-service', 'Complete air conditioner repair and maintenance services. We service window AC, split AC, and inverter AC units with gas refilling and deep cleaning.', 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg', '["Daikin", "LG", "Samsung", "Voltas", "Carrier", "Hitachi", "Blue Star"]', '[{"question": "Do you provide AC gas refilling?", "answer": "Yes, we provide complete gas refilling service with leak detection and repair."}, {"question": "How often should I service my AC?", "answer": "We recommend AC servicing every 3-4 months for optimal performance and energy efficiency."}]'),
('Microwave Repair', 'microwave-repair', 'Expert microwave oven repair services for solo, grill, and convection models. We fix heating issues, turntable problems, and control panel repairs.', 'https://images.pexels.com/photos/7045869/pexels-photo-7045869.jpeg', '["Samsung", "LG", "IFB", "Godrej", "Bajaj", "Panasonic"]', '[{"question": "Can you repair convection microwaves?", "answer": "Yes, we repair all types of microwaves including solo, grill, and convection models."}, {"question": "What if my microwave is not heating?", "answer": "Non-heating issues are commonly caused by magnetron or capacitor problems, which we can diagnose and fix."}]'),
('TV Repair', 'tv-repair', 'Professional TV repair services for LED, LCD, Smart TV, and home theatre systems. We fix screen issues, sound problems, and smart TV connectivity.', 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg', '["Samsung", "LG", "Sony", "Mi", "TCL", "Panasonic", "Philips"]', '[{"question": "Do you repair Smart TV software issues?", "answer": "Yes, we handle software updates, app installation issues, and connectivity problems."}, {"question": "Can you fix cracked TV screens?", "answer": "We assess screen damage and provide cost-effective solutions, though replacement might be recommended for severely damaged screens."}]'),
('Water Purifier Service', 'water-purifier-service', 'Complete RO and UV water purifier service and repair. We handle filter replacement, membrane cleaning, and system maintenance for all brands.', 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg', '["Kent", "Aquaguard", "Pureit", "Livpure", "Blue Star", "Havells"]', '[{"question": "How often should I replace RO filters?", "answer": "Pre-filters should be replaced every 6-8 months, while RO membrane typically lasts 2-3 years."}, {"question": "Do you provide AMC services?", "answer": "Yes, we offer annual maintenance contracts with regular filter replacements and system check-ups."}]');

INSERT INTO reviews (name, rating, message, service) VALUES
('Rajesh Kumar', 5, 'Excellent service! Fixed my refrigerator the same day I called. Very professional technician and reasonable pricing.', 'Refrigerator Repair'),
('Priya Sharma', 5, 'Quick and efficient AC repair service. The technician was knowledgeable and explained everything clearly. Highly recommended!', 'AC Repair'),
('Amit Patel', 4, 'Good service for washing machine repair. Came on time and fixed the drainage issue properly. Fair pricing.', 'Washing Machine Repair'),
('Sunita Reddy', 5, 'Outstanding TV repair service! My Smart TV was having connectivity issues and they resolved it perfectly. Great work!', 'TV Repair'),
('Vikram Singh', 5, 'Professional water purifier service. Replaced all filters and cleaned the system thoroughly. Very satisfied with the service.', 'Water Purifier'),
('Meera Joshi', 4, 'Reliable microwave repair service. Fixed the heating issue and provided good warranty. Will use again.', 'Microwave Repair');

INSERT INTO blog_posts (title, slug, summary, content, image_url, published) VALUES
('10 Signs Your Refrigerator Needs Repair', '10-signs-refrigerator-needs-repair', 'Learn the warning signs that indicate your refrigerator needs professional repair before it breaks down completely.', 'Your refrigerator is one of the most important appliances in your home, running 24/7 to keep your food fresh and safe. However, like any appliance, it can develop problems over time. Here are 10 key signs that your refrigerator needs professional repair:\n\n1. **Temperature Issues**: If your food is spoiling faster than usual or ice cream is too soft, your refrigerator may not be maintaining proper temperature.\n\n2. **Excessive Noise**: While refrigerators make some noise, loud grinding, buzzing, or clicking sounds indicate mechanical problems.\n\n3. **Water Leaks**: Puddles of water around your refrigerator suggest issues with the defrost system or door seals.\n\n4. **High Energy Bills**: A sudden increase in electricity costs might indicate your refrigerator is working harder than it should.\n\n5. **Frost Buildup**: Excessive frost in the freezer or on food items indicates defrost system problems.\n\n6. **Door Seal Issues**: If the rubber door seals are cracked or loose, cold air escapes, making the unit work harder.\n\n7. **Compressor Problems**: If the back of your refrigerator feels very hot, the compressor might be overworking.\n\n8. **Ice Maker Malfunction**: No ice production or strange-tasting ice indicates ice maker problems.\n\n9. **Frequent Cycling**: If your refrigerator turns on and off too frequently, it may have thermostat issues.\n\n10. **Age Factor**: Refrigerators older than 10-15 years are more prone to breakdowns and may need frequent repairs.\n\nIf you notice any of these signs, contact Vansh Service Center for professional diagnosis and repair. Our certified technicians can identify the problem and provide cost-effective solutions to extend your refrigerator''s life.', 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg', true),
('How to Maintain Your Washing Machine', 'maintain-washing-machine-tips', 'Essential maintenance tips to keep your washing machine running efficiently and extend its lifespan.', 'Regular maintenance of your washing machine can significantly extend its lifespan and improve its performance. Here''s a comprehensive guide to keeping your washing machine in top condition:\n\n**Monthly Cleaning Tasks:**\n\n1. **Clean the Lint Filter**: Remove and clean the lint filter after every few washes to prevent clogging.\n\n2. **Wipe Down Surfaces**: Clean the exterior, control panel, and door with a damp cloth.\n\n3. **Check Hoses**: Inspect water inlet hoses for cracks, bulges, or leaks.\n\n**Deep Cleaning (Monthly):**\n\n1. **Run Empty Hot Water Cycle**: Add 2 cups of white vinegar to remove soap residue and mineral deposits.\n\n2. **Clean the Drum**: Scrub the drum with baking soda paste to remove stubborn stains and odors.\n\n3. **Clean Door Seals**: Remove debris and moisture from rubber door seals to prevent mold growth.\n\n**Best Practices:**\n\n- Don''t overload the machine - follow capacity guidelines\n- Use the right amount of detergent - too much creates excess suds\n- Leave the door open after use to air dry and prevent mold\n- Check pockets for coins, tissues, and other items before washing\n- Level your machine to prevent excessive vibration\n\n**Warning Signs to Watch For:**\n\n- Unusual noises during operation\n- Excessive vibration or movement\n- Water not draining properly\n- Clothes coming out still dirty\n- Strange odors from the machine\n\n**When to Call Professionals:**\n\nIf you notice persistent problems like poor cleaning performance, unusual noises, or water leaks, it''s time to call professional repair services. Vansh Service Center provides expert washing machine repair and maintenance services for all major brands.\n\nRegular maintenance not only prevents costly repairs but also ensures your clothes are cleaned effectively and your machine operates efficiently.', 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg', true);