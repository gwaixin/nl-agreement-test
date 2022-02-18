import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "../store/consentSlice";

function FormSuccess() {

  const dispatch = useDispatch();


  return (
    <div className="text-center">
      <span className="fab icon-check-sheet"></span>

      <p>Thank you, your consent has been <br /> successfully saved!</p>

      <Link to="/consents" onClick={() => dispatch(reset())}>View all consents</Link>
    </div>
  )
}

export default FormSuccess;