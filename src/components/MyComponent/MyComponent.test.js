import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyComponent from './';

Enzyme.configure({ adapter: new Adapter() });

describe('MyComponent', () => {
  describe('onChange', () => {
    let onChange;
    let component;

    beforeEach(() => {
      onChange = jest.fn();
      component = mount(
        <MyComponent
          onChange={ onChange }
        />
      );
    });

    describe('when input changes', () => {
      beforeEach(() => {
        act(() => {
          component.find('input')
            .first()
            .simulate('change');
        });
      });

      it('calls the onChange callback', () => {
        expect(onChange)
          .toHaveBeenCalled();
      });
    });

    describe('when input does not change', () => {
      it('does not call the onChange callback', () => {
        expect(onChange)
          .not
          .toHaveBeenCalled();
      });
    });
  });

  describe('before button is clicked', () => {
    let component;

    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    beforeEach(async () => {
      await act(() => {
        component = mount(
          <MyComponent />
        );
        return Promise.resolve();
      });
    });


    it('does not render the data', () => {
      expect(
        component
          .exists(
            'li[data="foo"]'
          )
      ).toBe(false);
    });
  });

  describe('on button click', () => {
    let component;

    beforeEach(async () => {
      await act(() => {
        component = mount(
          <MyComponent />
        );
        component.find('button')
          .first()
          .simulate('click');

        return Promise.resolve();
      });

      component.update();
    });


    it('renders the data', () => {
      expect(
        component
          .exists(
            'li[data="foo"]'
          )
      ).toBe(true);
    });
  });

  describe('on timeout button click', () => {
    let component;

    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    beforeEach(() => {
      component = mount(
        <MyComponent />
      );

      act(() => {
        component.find('button')
          .at(1)
          .simulate('click');

        jest.runOnlyPendingTimers();
      });

      component.update();
    });

    it('adds the --isRed CSS state modifier', () => {
      expect(component.exists('.MyComponent--isRed'))
        .toBe(true);
    });
  });
});
