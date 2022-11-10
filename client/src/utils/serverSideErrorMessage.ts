// This message was made for the maintainer of this project
export const serverSideErrorMessage = (error: any) => {
  const fontRed = '\x1b[31m'
  const fontWhite = '\x1b[37m'
  const fontYellow = '\x1b[33m'

  console.log(
    fontRed,
    '[+]---------------ATTENTION!---------------[+]\n',
    fontWhite,
    'Your local server needs to run with localhost.\n  Stop your backend server and run this on your terminal.\n\n',
    fontYellow,
    'php artisan serve --host=localhost',
    fontRed,
    `\n\n  Error Code: ${error.code}\n`,
    fontRed,
    '[+]---------------ATTENTION!---------------[+]'
  )
}
