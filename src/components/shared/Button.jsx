const Button = ({children, size = "sm" | "lg", className}) => {
    const sizeStyle = size === "sm" ? "py-3 px-6 text-sm" : "px-8 py-3 text-lg"
  return (
    <button className={`bg-neutral-800 text-white ${className} ${sizeStyle} rounded-[30px]`}>{children}</button>
  )
}

export default Button;