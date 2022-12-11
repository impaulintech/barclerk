export const customStyles = {
  control: (provided: Record<string, unknown>, state: any) => ({
    ...provided,
    height: 42,
    boxShadow: 'none',
    borderColor: 'none',
    '&:hover': {
      color: '#60B3D1'
    },
    border: state.isFocused ? '1.5px solid #60B3D1' : '1.5px solid #cbd5e1'
  }),
  option: (styles: any, state: any) => ({
    ...styles,
    color: state.isSelected ? '#FFF' : styles.color,
    backgroundColor: state.isSelected ? '#60B3D1' : styles.color,
    borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
    '&:hover': {
      color: '#FFF',
      backgroundColor: '#60B3D1'
    }
  }),
  input: (base: any) => ({
    ...base,
    'input:focus': {
      boxShadow: 'none',
      border: '1px solid #60B3D1'
    }
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
}
