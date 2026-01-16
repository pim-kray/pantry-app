# pantry-app
Open-Source household app (Working Title)

# Backend 
For this project, I have decided to use Ruby as the main language. This is not by design choice, but rather because I
wish to learn Ruby. This is not exactly ideal for a self-hosted app on an older version of a raspberry pi for example, 
since it's a bit heavier than python.

I have NOT chosen to use rails, I am not familiar with it and solely want to use Ruby as a backend language. Again, this
is not an optimal design choice, but rather a learning experience. If you want to use another backend language, feel free
to do so.

- Ruby
- Sinatra
- JSON API only
- No server-side rendering
- Designed to be self-hosted

## How to start the backend

### Prerequisites

Make sure you have the following installed:

- Ruby **3.2 or higher**
- Budler ( `gem install bundler`)

You can check your ruby version with 
```BASH
ruby -v
```

If you do not have it installed, you can download it from [here](https://rubyinstaller.org/downloads/).
Be sure to add ruby to your PATH variable and test it again.

after that has succeeded do the following:
```BASH
cd apps/backend
bundle install
```

### Starting the backend
Start the backend using Rack:

```BASH
bundle exec rackup -p 3000
```

You can choose whatever port you want, but the app will be based on 3000.