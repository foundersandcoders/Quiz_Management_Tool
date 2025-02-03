import { EnvVarWarning } from '@/components/preGenerated/env-var-warning';
import HeaderAuth from '@/components/preGenerated/header-auth';
import { ThemeSwitcher } from '@/components/preGenerated/theme-switcher';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import './globals.css';
import checkAdmin from '@/utils/supabase/checkAdmin';



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminCheckResults = await checkAdmin()
  return (
    <html lang='en' className={GeistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main className='min-h-screen flex flex-col items-center'>
            <div className='flex-1 w-full flex flex-col gap-20 items-center'>
              <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
                <div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
                  <div className='flex gap-5 items-center font-semibold'>
                    <div className='flex items-center gap-2'>
                   {adminCheckResults && <Link href={'/learners'}>Home</Link>}
                   {adminCheckResults && <Link href={'/addQuiz'}>Add Quiz</Link>}
                   {!adminCheckResults && <Link href={'/quizzes'}>Home</Link>}

                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className='flex flex-col gap-20 max-w-5xl p-5'>
                {children}
              </div>

              <footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16'>
                <p>
                  Powered by{' '}
                  <a
                    href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
                    target='_blank'
                    className='font-bold hover:underline'
                    rel='noreferrer'
                  >
                    Supabase
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
