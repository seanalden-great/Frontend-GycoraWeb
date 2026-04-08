import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What makes the Ethereal Glow Brush different from other hair brushes?",
    answer: "The Ethereal Glow Brush uses static-free technology and is made from conductive carbon molecules, which help reduce static buildup in the hair. Its design not only enhances your hair’s natural shine but also improves overall hair health, making it smoother and easier to manage, especially in humid climates."
  },
  {
    question: "How does the Ethereal Glow Brush improve the health of my hair?",
    answer: "The carbon molecules in the Ethereal Glow Brush have conductive properties that help neutralize static electricity, which can cause frizz and damage. This makes your hair look shinier and healthier while preventing breakage. The flexible bristles also reduce pain and minimize hair damage during brushing."
  },
  {
    question: "Is the Ethereal Glow Brush suitable for all hair types?",
    answer: "Yes! The brush is designed with flexible spiral bristles that easily glide through all hair types, from straight to curly, and even tangled hair. It’s especially effective in managing unruly hair and minimizing breakage, making it a versatile tool for daily use."
  },
  {
    question: "How durable is the Ethereal Glow Brush?",
    answer: "The brush is made with carbon molecules, known for their strong and resilient structure. This makes the Ethereal Glow Brush resistant to pressure and damage, ensuring it lasts longer than traditional brushes while maintaining optimal performance."
  },
  {
    question: "Can the Ethereal Glow Brush be used in humid climates?",
    answer: "Absolutely! The static-free technology and conductive carbon material make this brush ideal for humid environments. It helps prevent static buildup, reducing frizz and flyaways, and leaves your hair looking smooth and shiny even in challenging weather conditions."
  },
  {
    question: "Do you offer discounts and promotions?",
    answer: "Yes! from time to time we offer discounts and promotions. Sign up for our email and/or WhatsApp to stay updated on our latest offers!"
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-20 font-sans bg-white">
      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-4 text-sm font-bold tracking-widest uppercase text-gycora">Common Questions</h2>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Segala hal yang perlu Anda ketahui tentang produk unggulan kami, Ethereal Glow Brush.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`overflow-hidden border transition-all duration-300 rounded-2xl ${
                activeIndex === index ? "border-gycora bg-emerald-50/30" : "border-gray-200 bg-white"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold ${activeIndex === index ? "text-gycora-dark" : "text-gray-900"}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? "rotate-180 text-gycora" : "text-gray-400"}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  activeIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 leading-relaxed text-gray-600 border-t border-emerald-100/50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="p-10 mt-20 text-center bg-gray-900 rounded-3xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <h3 className="mb-2 text-2xl font-bold text-white">Still have questions?</h3>
          <p className="mb-8 text-gray-400">Can't find the answer you're looking for? Please chat with our friendly team.</p>
          <Link 
            to="/contact" 
            className="inline-block px-8 py-3 font-bold transition-all rounded-full bg-gycora text-white hover:bg-gycora-dark hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}