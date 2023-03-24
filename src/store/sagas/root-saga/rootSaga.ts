import { loginWatcher } from "../watchers/loginWatcher";

export default function* rootSaga() {
   yield loginWatcher();
}