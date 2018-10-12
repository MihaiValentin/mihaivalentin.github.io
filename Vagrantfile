Vagrant.configure(2) do |config|
  config.vm.box = "hashicorp/precise64"

  config.vm.synced_folder ".", "/vagrant", fsnotify: true
  
  config.vm.network "forwarded_port", guest: 4000, host: 4000

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install python-software-properties -y
    sudo apt-add-repository ppa:brightbox/ruby-ng
    sudo apt-get update
    sudo apt-get install ruby2.2 ruby2.2-dev -y
    sudo apt-get install -y make
    sudo gem install jekyll -v 3.0.5 -V
    sudo gem install jekyll-redirect-from
    cd /vagrant && jekyll serve --host 0.0.0.0 --watch
  SHELL
end
