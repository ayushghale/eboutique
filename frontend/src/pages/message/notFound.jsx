export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-2 text-center">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Oops! Page Not Found</h1>
      <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
        The page you are looking for might have been removed had its name changed or is temporarily unavailable.
      </p>
      <a
        className="inline-flex h-10 items-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        href="/"
      >
        Go Back
      </a>
    </div>
  )
}
