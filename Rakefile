namespace :plugin do
  task :build do
    sh "bundle exec rakep build"
    sh "cp ./compiled/ember-segmentio.js ./ember-segmentio.js"
  end

  task :clean do
    sh "rm -rf ./tmp"
    sh "rm -rf ./compiled"
  end
end
