#
# An EXIF plugin for Jekyll
# 
# USAGE
# <h1>{{ img.url | exif: [param] }}</h1>
#
# By Paul Robert Lloyd 
# https://github.com/paulrobertlloyd/paulrobertlloyd.com/blob/master/source/_plugins/liquid-filters/exif.rb

require 'exiftool'

module Jekyll
  module ExifFilter

    def exif(url, param)
      source = @context.registers[:site].config['source']

      if File.exist?(url)
        file_name = url
      else
        file_name = File.join(source, url)
      end

      metadata = Exiftool.new(file_name)

      return param.split('.').map{ |property, method|
        metadata[property.to_sym]
      }
    end

  end
end

Liquid::Template.register_filter(Jekyll::ExifFilter)