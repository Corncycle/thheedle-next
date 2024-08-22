import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="relative bg-black h-svh flex flex-col items-center overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
