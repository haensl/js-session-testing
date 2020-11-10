import React, { useCallback, useState } from 'react';
import { component } from '@haensl/services';
import { fetchStuff } from '../../services/some-resource';
import './MyComponent.css';

const MyComponent = ({
  onChange
}) => {
  const [data, setData] = useState();
  const [isRed, setIsRed] = useState(false);

  const onClickA = useCallback(async () => {
    setData(await fetchStuff());
  }, []);

  const onClickB = useCallback(() => {
    setTimeout(() => {
      setIsRed((isRed) => !isRed);
    }, 1500);
  }, []);

  const className = component.className({
    isRed
  }, 'MyComponent');

  return (
    <div className={ className }>
      <input
        type={ 'text' }
        onChange={ onChange }
      />
      <div>
        <button
          onClick={ onClickA }
        >async data fetching</button>
        {
          data
          && (
            <ul>
              {
                data.map((d, i) =>
                  <li
                    key={ i }
                    data={ d }>
                    { d }
                    </li>)
              }
            </ul>
          )
        }
      </div>
      <button
        onClick={ onClickB }
      >timeout</button>
    </div>
  );
};

export default MyComponent;
