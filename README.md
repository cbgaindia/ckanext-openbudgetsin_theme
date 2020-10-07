### Installation Instructions for CKAN version 2.6

#### Step 1 - Install the required packages

```
sudo apt-get install python-dev postgresql libpq-dev python-pip python-virtualenv git-core openjdk-8-jdk
```

#### Step 2 - Install CKAN into a Python virtual environment

If you’re installing CKAN for development and want it to be installed in your home directory, you can symlink the directories used in this documentation to your home directory. This way, you can copy-paste the example commands from this documentation without having to modify them, and still have CKAN installed in your home directory:

```
mkdir -p ~/ckan/lib
sudo ln -s ~/ckan/lib /usr/lib/ckan
mkdir -p ~/ckan/etc
sudo ln -s ~/ckan/etc /etc/ckan
```
* Create a Python virtual environment (virtualenv) to install CKAN into, and activate it:
```
sudo mkdir -p /usr/lib/ckan/default
sudo chown `whoami` /usr/lib/ckan/default   # "Whoami" will be the owner of folder
virtualenv --python=/usr/bin/python2.7 --no-site-packages /usr/lib/ckan/default   # "default" will be the name of virtualenv
. /usr/lib/ckan/default/bin/activate
```
* Install the CKAN source code into your virtualenv. To install the latest stable release of CKAN (CKAN 2.6.7), run:
```
pip install -e 'git+https://github.com/ckan/ckan.git@ckan-2.6.7#egg=ckan'
```
* Install the Python modules that CKAN requires into your virtualenv:
```
pip install -r /usr/lib/ckan/default/src/ckan/requirements.txt
```
*To avoid the Error: could not determine PostgreSQL version from '10.14'
Upgrade psycopg2  from 2.4.5 to 2.7.5 (in requirements.txt)
* Deactivate and reactivate your virtualenv, to make sure you’re using the virtualenv’s copies of commands like paster rather than any system-wide installed copies:
```
deactivate
. /usr/lib/ckan/default/bin/activate
```
#### Step 3 - Setup a PostgreSQL database
```
sudo -u postgres createuser -S -D -R -P ckan_default   # ckan-default -> User
sudo -u postgres createdb -O ckan_default ckan_default -E utf-8   # ckan_default -> User, DB name
```
#### Step 4- Create a CKAN config file
* Create a directory to contain the site’s config files:
```
sudo mkdir -p /etc/ckan/default
sudo chown -R `whoami` /etc/ckan/  # "Whoami" will be the owner of folder
sudo chown -R `whoami` ~/ckan/etc  # "Whoami" will be the owner of folder
```
* Create the CKAN config file:
```
paster make-config ckan /etc/ckan/default/development.ini
```
* Edit the development.ini file in a text editor, changing the following options:

1) sqlalchemy.url
This should refer to the database we created in 3. Setup a PostgreSQL database above:
```
sqlalchemy.url = postgresql://ckan_default:pass@localhost/ckan_default 
```
2) site_url
Provide the site’s URL (used when putting links to the site into the FileStore, notification emails etc). For example:
```
ckan.site_url = http://127.0.0.1:5000
```
Do not add a trailing slash to the URL.

#### Step 5 - Setup Solr
Follow this link -> https://github.com/ckan/ckan/wiki/Install-and-use-Solr-6.5-with-CKAN

#### Step 6 - Create database tables
```
cd /usr/lib/ckan/default/src/ckan
paster db init -c /etc/ckan/default/development.ini
```
You should see `Initialising DB: SUCCESS.`

#### Step 7 - Link to who.ini
who.ini (the Repoze.who configuration file) needs to be accessible in the same directory as your CKAN config file, so create a symlink to it:
```
ln -s /usr/lib/ckan/default/src/ckan/who.ini /etc/ckan/default/who.ini
```
#### Step 8 - You’re done!
```
cd /usr/lib/ckan/default/src/ckan
paster serve /etc/ckan/default/development.ini
```
Open http://127.0.0.1:5000/ in a web browser, and you should see the CKAN front page.

### Installation Intructions for Plugins
Follow the link -> https://docs.google.com/document/d/1yoR-caP80XLvXyTaaVVEK0u1jGEhTfoxzhW3ZrZt6ho/edit?usp=sharing


