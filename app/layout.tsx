import './globals.css'

export const metadata = {
  title: 'Server browser',
  description: 'Web based server browser for BattleBit Remastered',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto max-w-6xl my-20 shadow-md">
          {children}
        </div>
      </body>
    </html>
  )
}
