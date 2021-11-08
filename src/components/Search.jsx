import { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import { changeTime } from '../action';
import { connect } from 'react-redux';

const Search = ({ search, changeTime }) => {
  const [ textSearch, setTextSearch ] = useState('');

  const handleChange = ({ target: { value } }) => {
    const regex = /^[\d]{2}$/

    if (regex.test(value)) {
      value += ':'
    }

    if (value.length <= 5) {
      setTextSearch(value)
    }

  }

  const changeTimeBySearch = (value) => {
    const array = value.split(':');
    const minutes = array[0];
    const seconds = array[1];

    changeTime(minutes, seconds)
  }

  const searchEnter = (event) => {
    const ENTER_KEYCODE = 13;
    const regex = /^\d{2}:\d{2}$/s
       
    if (event.keyCode === ENTER_KEYCODE && regex.test(textSearch)) {
      changeTimeBySearch(textSearch);
      setTextSearch('');
    }
    
  }

  const transition = useTransition(search, {
    from: { width: 0, opacity: 0 },
    enter: { width: 100, opacity: 1 },
    leave: { width: 0, opacity: 0 },
  })

  return (
    <>
      <div className="search-container">
        { transition((style, item) => 
          item &&
            <animated.input
              autoComplete="off"
              style={ style }
              type="text"
              name="textSearch"
              value={ textSearch }
              placeholder="00:00"
              onChange={ handleChange }
              onKeyUp={ searchEnter }
            />
            ) 
        }
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch) => ({
  changeTime: (minutes, seconds) => dispatch(changeTime(minutes, seconds))
})

export default connect(null, mapDispatchToProps)(Search);
