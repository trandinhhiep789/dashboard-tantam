import { useDispatch, useSelector } from 'react-redux'

// import { increaseNumber, desNumber } from './redux/actions'
import { increaseNumberSaga, desNumberSaga, getDataSaga, increaseNumbrSelector } from './counter/numberSlice'
import { login, logout } from './auth/authSlide'
import './TestToolkitSaga.css'
import { DownloadOutlined } from '@ant-design/icons'

import { Button } from 'antd'

function TestToolkitSaga() {
  const dispatch = useDispatch()
  const globalNumber = useSelector(increaseNumbrSelector)
  return (
    <div
      className="App"
      style={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '30%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px 10px',
          borderRadius: '12px',

          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          backgroundColor: '#fff'
        }}
      >
        <div>
          <div>TestToolkitSaga</div>
          <br />
          <br />
          <div>
            <Button
              type="primary"
              shape="circle"
              onClick={() => {
                dispatch(increaseNumberSaga())
              }}
            >
              +
            </Button>
            &emsp;<b>{globalNumber}</b>&emsp;
            <Button
              type="primary"
              shape="circle"
              onClick={() => {
                dispatch(desNumberSaga())
              }}
            >
              -
            </Button>
          </div>
          <br />
          <Button
            icon={<DownloadOutlined />}
            type="primary"
            onClick={() => {
              dispatch(getDataSaga())
            }}
          >
            Get data
          </Button>
          <br /> <br />
          <Button
            type="primary"
            onClick={() => {
              dispatch(
                login({
                  username: '',
                  password: ''
                })
              )
            }}
          >
            Fake login
          </Button>
          <br /> <br />
          <Button
            type="primary"
            onClick={() => {
              dispatch(
                logout({
                  username: '',
                  password: ''
                })
              )
            }}
          >
            Fake logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TestToolkitSaga
