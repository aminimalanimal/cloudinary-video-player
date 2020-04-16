import ShoppableWidget from '../../components/shoppable-bar/shoppable-widget';

function cldInteractivePlugin(player, options) {
  if (options) {
    // eslint-disable-next-line no-new
    new ShoppableWidget(player, options);
  }
}

export default cldInteractivePlugin;

