page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

configure :development do
  activate :deploy do |deploy|
    deploy.deploy_method = :git
  end

  activate :livereload
end

configure :build do
  set :http_prefix, '/redraw'

  activate :minify_css
  activate :minify_javascript
end
