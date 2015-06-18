#!/usr/bin/env bash

ANDROID_SDK_FILENAME=android-sdk_r24-linux.tgz
ANDROID_SDK=http://dl.google.com/android/$ANDROID_SDK_FILENAME

sudo apt-get update
sudo apt-get install -y npm openjdk-7-jdk ant expect
sudo apt-get install -y android-tools-adb android-tools-fastboot
sudo apt-get install -y libc6-i386 lib32stdc++6 lib32gcc1 lib32ncurses5 zlib1g lib32z1
sudo npm config set registry http://registry.npmjs.org/
curl -sL https://deb.nodesource.com/setup_0.10 | sudo bash -
sudo apt-get install -y  nodejs
sudo npm install -g cordova

curl -O $ANDROID_SDK
tar -xzvf $ANDROID_SDK_FILENAME
sudo chown -R vagrant ~/android-sdk-linux/

echo "ANDROID_HOME=~/android-sdk-linux" >> /home/vagrant/.bashrc
echo "export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64" >> /home/vagrant/.bashrc
echo "PATH=\$PATH:~/android-sdk-linux/tools:~/android-sdk-linux/platform-tools" >> /home/vagrant/.bashrc

echo "ANDROID_HOME=~/android-sdk-linux" >> /home/vagrant/.zshrc
echo "export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64" >> /home/vagrant/.zshrc
echo "PATH=\$PATH:~/android-sdk-linux/tools:~/android-sdk-linux/platform-tools" >> /home/vagrant/.zshrc

expect -c '
set timeout -1   ;
spawn /home/vagrant/android-sdk-linux/tools/android update sdk -u --all --filter platform-tool,android-22,build-tools-19.1.0
expect { 
    "Do you accept the license" { exp_send "y\r" ; exp_continue }
    eof
}
'