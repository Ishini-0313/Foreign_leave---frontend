import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-[#C4C6CF] px-6 py-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[#44474E] text-xs font-semibold leading-4">
                © 2024 Southern Provincial Government of Sri Lanka. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
                <a href="#" className="text-[#44474E] text-base leading-6 hover:text-[#002046] transition-colors">
                    Privacy Policy
                </a>
                <a href="#" className="text-[#44474E] text-base leading-6 hover:text-[#002046] transition-colors">
                    Terms of Service
                </a>
                <a href="#" className="text-[#44474E] text-base leading-6 hover:text-[#002046] transition-colors">
                    Contact Support
                </a>
            </div>
        </div>
    </footer>
  )
}
