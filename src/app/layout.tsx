import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="relative bg-black h-svh flex justify-center overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
