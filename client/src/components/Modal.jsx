function Modal({children, isOpen}) {
    // 👇 L'usage de cet ref va particulièrement nous intéresser 

    return isOpen ? (
        <div className="absolute flex justify-center items-center inset-0 backdrop-blur-sm">
            {children}
        </div>
    ) : null;
}

export default Modal;