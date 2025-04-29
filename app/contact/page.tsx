
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Blog App',
  description: 'Get in touch with our team',
}

export default function Contact() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Contact Us</h1>
      <form className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input type="email" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea className="w-full p-2 border rounded h-32"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}
