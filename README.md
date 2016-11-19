redmine-notify-client
=====================

Tiny Javascript client that connects to a message broker (tested with ActiveMQ) via the obscure but up-and-coming mqtt protocol.  There it listens on a topic for any incoming messages.  When there are messages, it will inspect them and based on their content take the appropriate action.

At the moment, it will play sounds as follows:
* applaud if a Redmine issue has been closed
* boo if a Redmine issue was reopened
* sound an alarm if a new issue was created that has a higher-than-normal priority

It doesn't do much more. Although, I have my eyes on a Delcom visual indicator: https://www.delcomproducts.com/products_USBLMP.asp

Also, it will probably be used with the `windows-service` npm module so that it runs as a Windows service.

Audio files found here:
* Boo sound effect: https://www.youtube.com/watch?v=PS_cV18z67Y
* Applause: http://soundbible.com/989-10-Second-Applause.html
* Siren: http://soundbible.com/1355-Warning-Siren.html
* Church bells: https://www.freesound.org/people/Yoram/sounds/172550/
