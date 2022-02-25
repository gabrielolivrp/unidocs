interface CardProps {
  children: React.ReactNode
  title?: string
  action?: React.ReactNode
  className?: string
}

const Card = ({ children, className, title, action }: CardProps) => (
  <div className={`${className} bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-50 rounded-3xl shadow-lg`}>
    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="text-left w-full">
        {!!title && (
          <div className="flex items-center justify-between leading-6">
            <label className="font-semibold text-lg">
              {title}
            </label>
            {action}
          </div>
        )}
        <div className="py-4">
          {children}
        </div>
      </div>
    </div>
  </div>
)

export default Card
