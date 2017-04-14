import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {
  Button,
  Cell,
  Cells,
  CellBody,
  CellFooter,
} from 'react-weui'
import ACTIONS from '../../actions/index'
import { resName, namespace } from '../../constants'
import styles from './message.less'

const Messages = ({ dispatch, messages }) => {
  const { list = [] } = messages
  const testClick = () => {
    dispatch(
      ACTIONS.RESS.getRessAction({
        resName: resName.message,
        namespace: namespace.message,
      }),
    )
  }

  return (
    <div className={styles.normal}>
      <Button size="small" onClick={testClick}>发送</Button>
      <Cells>
        {list.map((item) => {
          return (
            <Cell key={item.id}>
              <CellBody>{item.name}</CellBody>
              <CellFooter>{item.email}</CellFooter>
            </Cell>
          )
        })}
      </Cells>
    </div>
  )
}

Messages.defaultProps = {
  messages: {},
}

Messages.propTypes = {
  messages: PropTypes.object,
}

function mapStateToProps({ messages }) {
  return {
    messages: Object.assign({}, messages),
  }
}

export default connect(mapStateToProps)(Messages)
