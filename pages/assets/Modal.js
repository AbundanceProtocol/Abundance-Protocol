
const Modal = ({show=false}, props, children) => {
    return show ? (
        <div {...props} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        }}>
            {children}
        </div>
    ) : (<></>)
}

export default Modal