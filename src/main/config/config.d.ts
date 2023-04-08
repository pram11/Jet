type ConfigData = {
  server: string;
  users: [
    {
      handle: string;
      name: string;
      key: string;
    }
  ];
  'key-bindings': {
    next: Array<string>;
    prev: Array<string>;
    reply: Array<string>;
    'new-post': Array<string>;
    'next-tab': Array<string>;
    'prev-tab': Array<string>;
  };
  'user-config': {
    language: string;
  };
};

export { ConfigData };
