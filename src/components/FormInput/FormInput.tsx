

const FormInput = (props: any) => {
  return (
    <div className="FormInput">
        <label htmlFor="formInput">${props.name}</label>
        <input type={props.type} id='formInput'/>
    </div>
  )
}

export default FormInput