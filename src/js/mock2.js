if (typeof window.lightdm === 'undefined') {
  window.lightdm = {};

  let lightdm = window.lightdm;
  lightdm.is_authenticated = false;
  lightdm.hostname = 'hostname';
  lightdm.can_hibernate = true;
  lightdm.can_suspend = true;
  lightdm.can_restart = true;
  lightdm.can_shutdown = true;
  lightdm.suspend = function() {
    alert('System Suspended. Bye Bye');
  };

  lightdm.hibernate = function() {
    alert('System Hibernated. Bye Bye');
  };

  lightdm.restart = function() {
    alert('System restart. Bye Bye');
  };

  lightdm.shutdown = function() {
    alert('System Shutdown. Bye Bye');
  };

  lightdm.languages = [
    { code: 'en_US', name: 'English(US)', territory: 'USA' },
    { code: 'en_UK', name: 'English(UK)', territory: 'UK' }
  ];
  lightdm.authenticate = () => {};
  lightdm.cancel_authentication = () => {};
  lightdm.respond = () => {};
  lightdm.sessions = [
    {
      name: 'Xmonad',
      key: 'xmonad',
      comment: null,
    },
    {
      name: 'i3-gaps',
      key: 'i3',
      comment: null,
    }
  ];
  lightdm.default_session = 'Xmonad';
  lightdm.users = [
    {
      name: 'vinicius',
      real_name: 'Vinicius',
      display_name: 'Vinicius Gonçalves',
      language: 'en_US',
      layout: null,
      session: 'xmonad',
      logged_in: false
    },
    {
      name: 'pedro',
      real_name: 'Pedro',
      display_name: 'Pedro Henrique',
      language: 'en_US',
      layout: null,
      session: 'i3',
      logged_in: false
    }
  ];
}
