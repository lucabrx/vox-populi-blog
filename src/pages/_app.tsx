import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import  { Toaster } from 'react-hot-toast';
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import GlobalContextProvider from "~/context/GlobalContextProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
    <ThemeProvider attribute='class' >
    <GlobalContextProvider>
      <Toaster position="top-right" />
    <Component {...pageProps} />
    </GlobalContextProvider>
    </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
