
const Form = ({
  
  placeholder, 
  type , 
  className, 
  handleChangeValue, 
  value,
  autoComplete,
  name,
  id,
  checked,
 }) => 
         {


              return (
                     <input
                     type={type}
                     placeholder={placeholder}
                     className={className}
                     onChange={handleChangeValue}
                     value={value}
                     autoComplete={autoComplete}
                     required
                     name={name}
                     id={id}
                     checked={checked}
                    />
                 )
          }

export default Form