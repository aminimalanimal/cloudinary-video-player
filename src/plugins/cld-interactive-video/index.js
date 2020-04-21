import ShoppableWidget from '../../components/shoppable-bar/shoppable-widget';

class CldInteractivePlugin {
  constructor(player, options) {
    if (options) {
      // eslint-disable-next-line no-new
      new ShoppableWidget(player, options);
    }
  }
}

module.exports = { CldInteractivePlugin };


