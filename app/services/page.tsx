
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services - Blog App',
  description: 'Explore our range of services',
}

export default function Services() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="border p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">Content Writing</h2>
          <p>Professional content writing services for your needs.</p>
        </div>
        <div className="border p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">Editing</h2>
          <p>Expert editing and proofreading services.</p>
        </div>
        <div className="border p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">Consultation</h2>
          <p>Content strategy and consulting services.</p>
        </div>
      </div>
    </div>
  );
}
