function Modal({ children, isOpen }) {
  return isOpen ? (
    <div className="absolute flex justify-center items-center inset-0 backdrop-blur-sm">
      {children}
    </div>
  ) : null;
}

export default Modal;
