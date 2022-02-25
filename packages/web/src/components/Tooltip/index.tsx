export interface TooltipProps {
  children: string
  isDisplayed: boolean
}

const Tooltip = ({ children, isDisplayed }: TooltipProps) => (
  <div className={`${isDisplayed ? 'block' : 'hidden'} absolute -top-6 right-0`}>
    <div className="bg-white text-gray-700 dark:bg-black dark:text-gray-50 py-0.5 px-2 rounded-full">
      <label className="text-center text-xs">
        {children}
      </label>
    </div>
  </div>
)

export default Tooltip
