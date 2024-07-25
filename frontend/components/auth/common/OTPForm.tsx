import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { verifyphone, resendOTP } from "@/hooks/useVerifyOtp";
import { useTheme } from "@/context/ThemeContext";

// TypeScript type for the OTP array state
type OTPArray = string[];

const OTPForm: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme(); // Use the theme from the context
  const [otp, setOtp] = useState<OTPArray>(new Array(6).fill(""));
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");

  useEffect(() => {
    // Get the phone number from storage
    const phoneNumber = sessionStorage.getItem("phoneNumber");

    if (phoneNumber) {
      const maskedNumber =
        phoneNumber.slice(0, 2) + "xxxxxx" + phoneNumber.slice(-2);
      setFormattedPhoneNumber(maskedNumber);
    }
  }, []);

  // Check OTP verification
  const verifyOtp = async (otp: string): Promise<boolean> => {
    const phone = sessionStorage.getItem("phoneNumber");
    console.log("Verifying OTP:", phone, otp);
    const data = await verifyphone(phone, otp);
    console.log(data);
    if (data.status === 200) return true;
    return false;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!/^\d*$/.test(event.target.value)) return;
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);
    // Focus next input field if the value is not empty
    if (event.target.nextSibling && event.target.value) {
      (event.target.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otpValue = otp.join("");
    const isOtpValid = await verifyOtp(otpValue);
    console.log(isOtpValid);
    if (isOtpValid) {
      router.replace("/auth/signin")
    } else {
      console.log("The Entered OTP is not valid");
    }
    console.log("Submitted OTP is:", otpValue);
  };

  const handleResendClick = async () => {
    console.log("Resend OTP");
    const phone = sessionStorage.getItem("phoneNumber");
    await resendOTP(phone)
    // TODO: Implement the logic to resend OTP to the user
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-center p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">
        Please enter the One Time <br /> Password to verify your Account
      </h1>
      <p>A one time Password has been sent to +{formattedPhoneNumber}</p>
      <form onSubmit={handleSubmit} className="my-4">
        {otp.map((data, index) => (
          <input
            className={`otp-field border rounded-lg text-center text-xl py-2 w-12 mr-2 ${
              theme === "dark"
                ? "bg-transparent border-gray-700 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
            type="text"
            name="otp"
            maxLength={1}
            key={index}
            value={data}
            onChange={(e) => handleChange(e, index)}
            onFocus={(e) => e.currentTarget.select()}
          />
        ))}
        <button
          className={`font-bold py-2 px-4 rounded mt-4 ${
            theme === "dark"
              ? "bg-[#A4E320] text-[#00171A]"
              : "bg-[#248E38] text-white"
          }`}
          type="submit"
        >
          Verify OTP
        </button>
      </form>
      <p>
        If you don&apos;t receive a code!{" "}
        <span
          className="cursor-pointer text-[#248E38] dark:text-[#A4E320] hover:underline"
          onClick={handleResendClick}
        >
          Resend
        </span>
      </p>
    </div>
  );
};

export default OTPForm;
