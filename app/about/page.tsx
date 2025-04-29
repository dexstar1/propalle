
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Blog App',
  description: 'Learn more about our blog and team',
}

export default function About() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">About Us</h1>
      <div className="prose lg:prose-xl">
        <p>Welcome to our blog! We're passionate about sharing knowledge and insights.</p>
      </div>
    </div>
  );
}
