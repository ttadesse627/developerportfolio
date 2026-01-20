'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
export default function ContactPage() {

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  // Show loading toast
  const loadingToastId = toast.loading('Sending message...');

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {

      toast.dismiss(loadingToastId);
      
      // Show error toast with retry option
      toast.error('Failed to send', result.error || 'Something went wrong');
      
      // Optionally, you can add a retry button
      setTimeout(() => {
        toast.custom((t) => (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Send failed</p>
                <p className="text-sm text-gray-600 mt-1">Would you like to try again?</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toast.dismiss(t);
                    handleSubmit(e);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
                <button
                  onClick={() => toast.dismiss(t)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ), { duration: 10000 });
      }, 500);
      
      return;
    }

    toast.dismiss(loadingToastId);
    
    toast.success('Message sent!');
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    const resetTimer = setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 3000);

    // Optional: Show a follow-up toast when form resets
    setTimeout(() => {
      toast.info('Form cleared.\nReady for your next message');
    }, 3000);

  } catch (err) {
    // Dismiss loading toast
    toast.dismiss(loadingToastId);
    
    // Show error toast
    toast.error(
      'Connection error. Please check your internet connection and try again'
    );
    
    setIsSubmitting(false);
  }
};

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "ttadesse627@gmail.com",
      href: "mailto:ttadesse627@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+(251) 94 693 8942",
      href: "tel:+251946938942"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Dukem, Bishoftu",
      href: "https://maps.app.goo.gl/US6WKMy7R7zSgWqR8"
    }
  ];

  return (
    <div className="section-padding">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 dark:text-white">Get In Touch</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can work together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div>
            <div className="card p-8 sticky top-24">
              <h3 className="text-2xl font-bold mb-8 dark:text-white">Contact Information</h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="p-3 bg-primary/10 dark:bg-primary-dark/20 rounded-lg mr-4">
                      <info.icon className="h-6 w-6 text-primary dark:text-primary-dark" />
                    </div>
                    <div>
                      <div className="font-semibold dark:text-white">{info.title}</div>
                      <div className="text-secondary">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="border-t dark:border-gray-700 pt-6 w-full">
                <h4 className="font-semibold mb-4 dark:text-white">Available Hours for phone call <i className='text-sm'>(UTC+3)</i></h4>
                <div className="space-y-2 text-secondary flex flex-col">
                  <span><strong>Monday - Friday</strong></span>
                  <i className='ml-5'>06:30 - 09:00 | 17:00 - 22:00</i>
                  <span><strong>Saturday - Sunday</strong></span>
                  <i className='ml-5'>06:30 - 22:00</i>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Send a Message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-semibold mb-2 dark:text-white">Message Sent!</h4>
                  <p className="text-secondary">
                    Thank you for your message. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100"
                      placeholder="Project inquiry"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ Section */}
            <div className="mt-8 card p-8">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <div className="border-b dark:border-gray-700 pb-4">
                  <h4 className="font-semibold mb-2 dark:text-white">What is your typical response time?</h4>
                  <p className="text-secondary">
                    I usually respond within 24 hours.
                  </p>
                </div>
                
                <div className="border-b dark:border-gray-700 pb-4">
                  <h4 className="font-semibold mb-2 dark:text-white">Do you work with clients remotely?</h4>
                  <p className="text-secondary">
                    Yes, I work with clients from all over the world using modern collaboration tools.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 dark:text-white">What is your development process?</h4>
                  <p className="text-secondary">
                    I follow an agile methodology with regular communication, iterations, and feedback sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}