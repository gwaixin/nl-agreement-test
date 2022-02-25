import { Link } from "react-router-dom";

function FormSuccess() {

  return (
    <div className="text-center">
      <span className="fab icon-check-sheet"></span>

      <p>Thank you, your consent has been <br /> successfully saved!</p>

      <Link to="/consents">View all consents</Link>
    </div>
  )
}

export default FormSuccess;