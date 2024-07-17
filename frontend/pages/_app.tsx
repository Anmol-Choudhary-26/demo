import Layout from "@/components/Common/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BookmarkProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BookmarkProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
