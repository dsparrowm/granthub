-- Initial schema for Granthub
-- Run with: psql <connection> -f migrations/001_init.sql

-- enable extension for gen_random_uuid
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Grants table
CREATE TABLE IF NOT EXISTS grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organization TEXT,
  amount_min_cents INTEGER,
  amount_max_cents INTEGER,
  amount_text TEXT,
  deadline DATE,
  location TEXT,
  category TEXT,
  description TEXT,
  full_description TEXT,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grant_id UUID REFERENCES grants(id) ON DELETE SET NULL,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  amount_requested_cents INTEGER,
  fee_cents INTEGER,
  attachments JSONB,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
