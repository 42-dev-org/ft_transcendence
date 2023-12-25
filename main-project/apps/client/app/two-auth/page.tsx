"use client"
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import QRExample from 'assets-workspace/images/Example-QR-code.webp';
import Image from 'next/image';

export default function TwoAuth() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const [error, setError] = useState<boolean>(false); // Set initial error state to false
  const [image, setImage] = useState<string>("");
  const changeOtp = (index: number, value: string): void => {
    setError(false); // Reset error when OTP changes
    const newOTP: string[] = [...otp];
    newOTP[index] = value.substring(value.length - 1);
    setOtp(newOTP);
    if (value && index < 5) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleOnFocus = (index: number): void => {
    setError(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    const { key } = e;
    if (key === '-' || key === '+' || key === 'e' || key === '.') {
      e.preventDefault();
    }
    if (key === 'Backspace' && e.currentTarget === document.activeElement) {
      // Handle Backspace key
      const index = inputRefs.findIndex((ref) => ref?.current === document.activeElement);
      if (index > 0) {
        otp[index] = '';
        inputRefs[index - 1]?.current?.focus();
      }
    }
  };

  const handleOnStart = (): void => {
    // Implement the logic for handling the "Start" button click
    if (otp.some((digit) => digit === '')) {
      setError(true); // Set error if OTP is not complete
    } else {
      setError(false);
      // Implement your logic to handle the successful OTP entry
      console.log('Start button clicked with OTP:', otp.join(''));
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="bg-white p-[40px] flex flex-col justify-center items-center gap-4 rounded-xl">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h2 className="text-black font-bold text-2xl uppercase">Two Factor Authentication</h2>
          <h5 className="text-gray-600 font-light text-lg">Verify the two-factor code before login</h5>
        </div>
        <div className="border rounded-lg w-full justify-center items-center flex py-2">
          <Image alt="qr-code" src={QRExample} width={240} height={240} className="w-[240px] h-[240px]" />
        </div>
        <div className="flex flex-col justify-start gap-4 py-8">
          <div className="w-full h-20 flex flex-row gap-2">
            {otp.map((_, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="number"
                className={`border border-gray-400 rounded-lg h-full w-16 text-center text-2xl text-black focus:border-[#b9ef72] ${
                  otp[index] && 'border-[#b9ef72]'
                } ${error && 'border-red-500 text-red-500'}`}
                value={otp[index]}
                onChange={(e) => changeOtp(index, e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => handleOnFocus(index)}
              />
            ))}
          </div>
          {error && <p className="text-sm font-light text-red-500">Please enter a valid OTP</p>}
        </div>
        <button className="w-full rounded-lg px-40 py-3 bg-[#b9ef72]" onClick={handleOnStart}>
          Start
        </button>
        <button className="w-full rounded-lg px-40 py-3 bg-red-500 text-white">Ignore</button>
      </div>
    </div>
  );
}
