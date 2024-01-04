const dns = require('dns');

function resolveDomain(domainName) {
  dns.resolve(domainName, 'A', (err, addresses) => {
    if (err) {
      console.error(`Error while resolving ${domainName}: ${err}`);
      return;
    }

    console.log(`${domainName} resolves to:`);
    addresses.forEach((address, index) => {
      console.log(`IP Address ${index + 1}: ${address}`);
    });
  });
}

// Replace 'example.com' with the domain you want to resolve
resolveDomain('nexablock.io');
